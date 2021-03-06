import { Injectable } from '@angular/core';
import { IDynamicTableButton } from 'src/app/modules/shared-modules/table/table.interfaces';
import { ProfileCardComponent } from 'src/app/modules/admin-system/system/profile-card/profile-card.component';
import { Router } from '@angular/router';
import Store from 'src/app/models/admin-system/stores';
import Products from 'src/app/models/admin-system/products';
import Orders from 'src/app/models/admin-system/orders';
import User from 'src/app/models/admin-system/users';
import Customer from 'src/app/models/admin-system/customers';

@Injectable({
    providedIn: 'root',
})
export default class CompanyService {
    constructor(
        private router: Router
    ) {}

    getRowActions() {
        const actions: IDynamicTableButton[] = [
            {
                icon: 'chevron_left',
                type: 'TableButtonComponent',
                modal: {
                    number: 2,
                    row: 0,
                    buttons: [
                        {
                            icon: 'edit',
                            label: 'Editar',
                            type: 'TableButtonComponent',
                            event: (arg) => {
                                this.router.navigate(['/admin-system/companies/edit', arg._id]);
                            }
                        },
                        {
                            icon: 'info',
                            label: 'Informacion',
                            type: 'TableButtonComponent',
                            dialog: {
                                component: ProfileCardComponent,
                                height: '442px',
                                width: '408px',
                                data: {
                                    cardConfig: {
                                        cardType: 'CARD_IMAGE',
                                        cardImage: 'profileImage.url',
                                        cardTitle: 'name',
                                        cardSubTitle: 'country.name',
                                        labels: [
                                            'Id',
                                            'Pais',
                                            'Aplicacion',
                                            'Monedas',
                                            'Administrador',
                                            'Registro',
                                            'Actualizacion'
                                        ],
                                        columnData: [
                                            '_id',
                                            'country.name',
                                            'application.name',
                                            'currencies',
                                            'admin.firstName',
                                            'createdAt',
                                            'updatedAt'
                                        ],
                                        rowActions: [{
                                            label: 'mail_outline',
                                            icon: 'mail_outline'
                                        }]
                                    }
                                }
                            }
                        },
                        {
                            icon: 'store_mall_directory',
                            label: 'Tiendas',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableGalleryComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => Store.filter('company', arg._id).findRx(),
                                    galleryConfig: {
                                        galleryType: 'GALLERY_IMAGE',
                                        galleryListData: 'data',
                                        galleryImage: 'profileImage.url',
                                        galleryTitle: 'name',
                                        gallerySubTitle: 'description',
                                        galleryDescription: '',
                                        button: {
                                            icon: 'subdirectory_arrow_right'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            icon: 'view_compact',
                            label: 'Productos',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableGalleryComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => Products.filter('company', arg._id).findRx(),
                                    galleryConfig: {
                                        galleryType: 'GALLERY_IMAGE_CARD',
                                        galleryListData: 'data',
                                        galleryImage: 'profileImage.url',
                                        galleryTitle: 'name',
                                        gallerySubTitle: 'totalAvailable/b/Disponible:',
                                        galleryDescription: '',
                                        button: {
                                            icon: 'subdirectory_arrow_right',
                                            event: (arg) => {
                                                this.router.navigate(['/admin-system/stores/edit', arg._id]);
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            icon: 'list',
                            label: 'Ordenes',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableSecondTableComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => Orders.filter('company', arg._id).findRx(),
                                    secondTableConfig: {
                                        secondTableListData: 'data',
                                        multiSelect: true,
                                        fields: [
                                            {
                                                label: 'Id',
                                                value: '_id',
                                                type: 'TableTextComponent'
                                            },
                                            {
                                                label: 'Usuario',
                                                value: 'user.firstName',
                                                type: 'TableTextComponent'
                                            },
                                            {
                                                label: 'Cliente',
                                                value: 'customer.firstName',
                                                type: 'TableTextComponent'
                                            },
                                            {
                                                label: 'Total',
                                                value: 'total/b/ AR $',
                                                type: 'TableTextComponent'
                                            },
                                            {
                                                label: 'Estado',
                                                value: 'status',
                                                type: 'TableTextComponent'
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            icon: 'group',
                            label: 'Empleados',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableGalleryComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => User.filter('company', arg._id).findRx(),
                                    galleryConfig: {
                                        galleryType: 'GALLERY_USER',
                                        galleryListData: 'data',
                                        galleryImage: 'profileImage.url',
                                        galleryTitle: 'firstName',
                                        gallerySubTitle: 'email',
                                        galleryDescription: '',
                                        button: {
                                            icon: 'subdirectory_arrow_right',
                                            event: (arg) => {
                                                this.router.navigate(['/admin-system/users/edit', arg._id]);
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            icon: 'people',
                            label: 'Clientes',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableGalleryComponent',
                                row: 0,
                                data: {
                                    observable: (arg) =>Customer.filter('company', arg._id).findRx(),
                                    galleryConfig: {
                                        galleryType: 'GALLERY_USER',
                                        galleryListData: 'data',
                                        galleryImage: 'profileImage.url',
                                        galleryTitle: 'firstName,lastName',
                                        gallerySubTitle: 'email',
                                        galleryDescription: '',
                                        button: {
                                            icon: 'subdirectory_arrow_right'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            icon: 'delete',
                            label: 'Eliminar',
                            type: 'TableButtonComponent',
                            modal: {
                                number: 1,
                                row: 0,
                                question: 'Esta seguro que desea borrar la empresa?',
                                successButtonText: 'Si',
                                successButtonDisabled: (arg) => true,
                                cancelButtonText: 'No'
                            }
                        }
                    ]
                }
            }
        ];
        return actions;
    }
}
