import { Routes } from "@angular/router";

export const routes : Routes = [
    {
        path: '',
        loadComponent: () => import('../layout/layout.component'),
        children: [
            {
                path: '',
                loadComponent: () => import('./home/home.component'),
            }
            ,
            {
                path: 'about',
                loadComponent: () => import('./about/about.component'),
            },
            {
                path: 'jovenes',
                loadComponent: () => import('./jovenes/jovenes.component'),
            },
            {
                path: 'mn',
                loadComponent: () => import('./mn/mn.component'),
            },
            {
                path: 'damas',
                loadComponent: () => import('./damas/damas.component'),
            },
            {
                path: 'contacto',
                loadComponent: () => import('./contacto/contacto.component'),
            }
        ]
    }
];

export default routes