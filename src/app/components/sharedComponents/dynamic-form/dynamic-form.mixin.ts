import { Input } from '@angular/core';
import { FormModel, FormField, FormMainGroup, FormLateralGroup, FormattedValidations, MaterialFormData } from './dynamic-form.interfaces';
import chunk from 'lodash/chunk';
import groupBy from 'lodash/groupBy';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { FormGroup, FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
export class FormComponent {
    public form: FormGroup;
    protected id = '1';
    protected active: number = null;
    protected currentModel: FormModel = {};
    protected editedFieldsModel: FormModel = {};
    protected errors: ValidationErrors = {};
    protected groupIndexes: object = {};
    protected mainGroupsFormatted: FormMainGroup[] = [];
    @Input() protected fieldsConfig!: FormField[];
    @Input() protected model: FormModel;
    @Input() protected formType = 'tabs';
    @Input() protected columns: number;
    @Input() protected materialData: MaterialFormData;

    constructor(public fb: FormBuilder, public dynamicFormService: DynamicFormService) {}

    protected formatFields(): FormMainGroup[] {
        let mainGroupsFormatted: FormMainGroup[] = [];
        let order: number = 0;
        this.groupIndexes = {};
        this.form = this.fb.group({});
        this.fieldsConfig.forEach((field) => {
            if (field.validators) {
                const formattedValidations: FormattedValidations = this.dynamicFormService.formatValidations(field.validators, this.form);
                this.form.addControl(field.key, this.fb.control(field.defaultValue, formattedValidations.validations));
                this.form.controls[field.key]['errorMessages'] = formattedValidations.errorMessages;
            } else {
                this.form.addControl(field.key, this.fb.control(field.defaultValue));
            }
            // if (field.asyncValidator) {
            //     this.form.controls[field.key].setAsyncValidators(field.asyncValidator);
            // }
            const tab: string = field.mainGroup;
            const name: string = tab || 'Default tab';
            const group: string | null = field.flexConfig ? field.flexConfig.group : null;
            const item = mainGroupsFormatted.find((tabFormatted) => tabFormatted.name === name);
            if (item) {
                if (group) {
                    group === FormLateralGroup.left ? item.leftFieldGroup!.push(field)
                        : item.rightFieldGroup!.push(field);
                } else {
                    (item.fields as FormField[]).push(field);
                }
                this.groupIndexes[field.key] = order;
            } else {
                const tabNewItem: FormMainGroup = {
                    order,
                    name,
                    fields: [],
                    leftFieldGroup: [],
                    rightFieldGroup: [],
                };
                if (group) {
                    group === FormLateralGroup.left ? tabNewItem.leftFieldGroup!.push(field)
                        : tabNewItem.rightFieldGroup!.push(field);
                } else {
                    (tabNewItem.fields as FormField[]).push(field);
                }
                this.groupIndexes[field.key] = order;
                order++;
                mainGroupsFormatted.push(tabNewItem);
            }
        });
        mainGroupsFormatted = this.buildColumns(mainGroupsFormatted);
        return mainGroupsFormatted;
    }

    protected buildColumns(mainGroups: FormMainGroup[]): FormMainGroup[] {
        let mainGroupsFormatted: FormMainGroup[] = [];
        mainGroupsFormatted = mainGroups.map((group) => {
            if (group.fields.length === 1) {
                if (!(group.fields as FormField[])[0].flexConfig) {
                    (group.fields as FormField[])[0].flexConfig = {};
                }
                (group.fields as FormField[])[0].flexConfig!.flex = 100;
                group.fields = [group.fields as FormField[]];
            } else {
                group.fields = this.columns
                    ? this.buildRowsByColumns(group.fields as FormField[])
                    : this.buildRows(group.fields as FormField[]);
            }
            return group;
        });
        return mainGroupsFormatted;
    }

    protected buildRows(fields: FormField[]): FormField[][] {
        const rows: FormField[][] = [];
        fields = fields.map((field, i) => {
            return field.flexConfig ? field.flexConfig.row ? field : {
                ...field, flexConfig: {
                    ...field.flexConfig, row: i,
                },
            } : { ...field, flexConfig: { row: i } };
        });
        const fieldsGroups = groupBy(
            fields,
            (field: FormField) => field.flexConfig!.row,
        );
        Object.keys(fieldsGroups).forEach((group) => {
            rows.push(fieldsGroups[group]);
        });
        return rows;
    }

    protected buildRowsByColumns(fields: FormField[]): FormField[][] {
        const flex: number = Math.floor(100 / this.columns!);
        fields.map((fieldItem) => {
            if (!fieldItem.flexConfig) {
                fieldItem.flexConfig = {};
            }
            fieldItem.flexConfig!.flex = flex;
            return fieldItem;
        });
        return chunk(fields, this.columns!);
    }

    protected updateForm(model: FormModel) {
        const currentModel: FormModel = cloneDeep(model);
        this.fieldsConfig.forEach(field => {
            const value: any = get(currentModel, field.key, field.defaultValue || null);
            this.form.controls[field.key].patchValue(value);
        });
    }

    public validateForm(formGroup: FormGroup)  {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.controls[field];
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
                if (control.errors) this.errors[field] = control.errors;
            } else if (control instanceof FormGroup) {
                this.validateForm(control);
            }
        });
    }
}
