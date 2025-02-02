import { Routes } from "@angular/router";
import { EventosCdComponent } from "./eventos-cd/eventos-cd.component";

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
                path: 'eventos',
                loadComponent: () => import('./eventos/eventos.component'),
            },
            {
                path: 'eventos-cdcefed',
                component: EventosCdComponent,
            }
            ,
            {
                path: 'contacto',
                loadComponent: () => import('./contacto/contacto.component'),
            }
        ]
    }
];

export default routes