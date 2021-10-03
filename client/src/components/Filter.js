import React from 'react'

const list =[
    {
        id:'0',
        name:'CompetitiveProgramming',
    },
    {
        id:'1',
        name:'Music',
    },
    {
        id:'2',
        name:'Database'
    },
    {
        id:'3',
        name:'Web'
    },
    {
        id:'4',
        name:'Java',
    },
    {
        id:'5',
        name:'c++'
    },
    {
        id:'6',
        name:'Python',
    },
    {
        id:'7',
        name:'react',
    },
];
const Filter= (props)=> {
   const {display} =props;
    return (
        <ul className="filter" style={display}>
           {list.map( (item)=>(
            //    <li  key={item.id}>
                   <a href={item.name} className="filter-child" key={item.id}>{item.name}</a>
                //    </li>
           )
           )}
        </ul>
    );
};

export default Filter;
