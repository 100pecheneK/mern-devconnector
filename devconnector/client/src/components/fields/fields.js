import React from "react"

export const FormGroup = ({children, formGroupClassName = ''}) => (
    <div className={`form-group ${formGroupClassName}`}>
        {children}
    </div>
)

export const SmallText = ({children}) => (
    <small className="form-text">
        {children}
    </small>
)

export const Input = ({required, type = 'text', name, value, placeholder, onChange}) => (
    <input
        required={required}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
    />
)
export const FormGroupInput = ({smallText, ...rest}) => (
    <FormGroup>
        <Input {...rest}/>
        {smallText && <SmallText children={smallText}/>}
    </FormGroup>
)

export const FormGroupSocialInput = ({icon, ...rest}) => (
    <FormGroup formGroupClassName='social-input'>
        <i className={`fab fa-${icon} fa-2x`}/>
        <Input {...rest}/>
    </FormGroup>
)

export const TextArea = ({required = false, name, value, placeholder, onChange}) => (
    <textarea
        required={required}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
    />
)
export const FormGroupTextArea = ({smallText, ...rest}) => (
    <FormGroup>
        <TextArea {...rest}/>
        {smallText && <SmallText children={smallText}/>}
    </FormGroup>
)

export const FormGroupSelect = ({options, name, onChange, value}) => (
    <FormGroup>
        <select required name={name} value={value} onChange={onChange}>
            {options.map(({value, text}, i) => {
                let val, txt
                if (text && value) {
                    val = value
                    txt = text
                } else if (!text && value) {
                    val = value
                    txt = value
                } else if (text && !value) {
                    val = ''
                    txt = text
                } else {
                    val = ''
                    txt = ''
                }
                return (
                    <option key={i} value={val}>{txt}</option>
                )
            })}
        </select>
        <small className="form-text"
        >Give us an idea of where you are at in your career</small
        >
    </FormGroup>
)