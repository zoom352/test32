import React from 'react'
import Select from 'react-select'


const MySelect = ({options, value, onSelect}) => {
    
    return (
        <div>
            <Select 
            onChange={(selected)=>{onSelect(selected.map(v=>v.value))} }
            isMulti 
            options={options.map((v)=>({value: v, label: v.toString()}))} />
        </div>

    )
}

export default MySelect