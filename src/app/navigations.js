export const navigations = [

    { name: 'COMMUNICATION', path: '/CommForm', icon: 'dashboard' },
 
  

    { label: 'PROJECT', type: 'label' },
    {
        name: 'DELIVERABLES',
        icon: 'security',
        children: [

            { name: 'Connectivity', path: '/ConnectionForm', icon: 'dashboard' },
            { name: 'Hardware', path: '/Hardwareform', icon: 'dashboard' },
            { name: 'Software', path: '/Softwareform', icon: 'dashboard' },
            { name: 'Installation', path: '/Installationform', icon: 'dashboard' },
            { name: 'Training', path: '/Trainingform', icon: 'dashboard' },

        ],
    },
     { name: 'TABLE', path: '/Table', icon: 'dashboard' },
    { name: 'ProjectAssign', path: '/ProjectAssign', icon: 'dashboard' },
    { name: 'ProjectAdd', path: '/ProjectAdd', icon: 'dashboard' },
  
];
