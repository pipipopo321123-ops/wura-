import { Dish } from '../models/dish';

export const secondDishes: Dish[] = [
    {
        id: 's1',
        name: 'Стейк Рибай',
        description: 'Мраморная говядина, прожарка medium rare, подается с овощами гриль',
        price: 1200,
        category: 'second',
        image: '/img/sd/ribay.png'
    },
    {
        id: 's2',
        name: 'Паста Карбонара',
        description: 'Спагетти с беконом, яйцом, сыром пармезан и сливочным соусом',
        price: 550,
        category: 'second',
        image: '/img/sd/karbonara.png'
    },
    {
        id: 's3',
        name: 'Ризотто с грибами',
        description: 'Кремовое ризотто с белыми грибами и сыром пармезан',
        price: 480,
        category: 'second',
        image: '/img/sd/rizoto.png'
    },
    {
        id: 's4',
        name: 'Лосось на гриле',
        description: 'Филе лосося с лимонным соусом, спаржей и черри',
        price: 890,
        category: 'second',
        image: '/img/sd/losos.png'
    },
    {
        id: 's5',
        name: 'Котлета по-киевски',
        description: 'Куриная котлета с сливочным маслом внутри, картофельное пюре',
        price: 450,
        category: 'second',
        image: '/img/sd/kiev.png'
    },
    {
        id: 's6',
        name: 'Лазанья болоньезе',
        description: 'Мясная лазанья с соусом бешамель и сыром моцарелла',
        price: 520,
        category: 'second',
        image: '/img/sd/laz.png'
    },
    {
        id: 's7',
        name: 'Утка по-пекински',
        description: 'Утиная грудка с хрустящей корочкой, блинчики, соус хойсин и овощи',
        price: 980,
        category: 'second',
        image: '/img/sd/ytka.png'
    },
    {
        id: 's8',
        name: 'Овощное рагу',
        description: 'Тушеные овощи с цукини, баклажанами, перцем и томатным соусом',
        price: 380,
        category: 'second',
        image: '/img/sd/ragu.png'
    }
];