import { DynamicTableHeader, DynamicTableComponentType } from '../../modules/shared-modules/table/table.interfaces';
export const youtubeHeaders: DynamicTableHeader[] = [
    {
        label: 'Canal',
        key: 'snippet.channelTitle',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Titulo',
        key: 'snippet.title',
        component: DynamicTableComponentType.text
    },
    {
        label: '',
        key: 'snippet.thumbnails.default.url',
        component: DynamicTableComponentType.image

    }
];