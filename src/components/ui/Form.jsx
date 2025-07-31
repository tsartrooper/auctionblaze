import { createContext, useContext, useState } from "react";
import Button from "./Button";

export const FormContext = createContext();

function Form({ children, onSubmit }) {
    const [formData, setFormData] = useState({});

    const updateFormData = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
        </form>
    );
    }

    Form.Input = function FormInput({ name, type = "text", ...props }) {
    const { formData, updateFormData } = useContext(FormContext);

    return (
            <input
            name={name}
            type={type}
            onChange={(e) => updateFormData(name, e.target.value)}
            value={formData[name] || ""}
            {...props}
            />
    );
    };

    Form.Textarea = function FormTextarea({ name, placeholder, ...props }) {
    const { formData, updateFormData } = useContext(FormContext);

    return (
        <textarea
        name={name}
        placeholder={placeholder}
        onChange={(e) => updateFormData(name, e.target.value)}
        value={formData[name] || ""}
        {...props}
        />);
    };

    Form.Label = function FormLabel({children, ...props}){
        return <label {...props}>{children}</label>
    }

    Form.Field = function FormField({children}){
        return <div>{children}</div>
    }

    Form.DateTime = function FormDateTime({ name, label, ...props }) {
        const { formData, updateFormData } = useContext(FormContext);

        return (
            <div className="flex flex-col gap-1">
            {label && <label>{label}</label>}
            <input
                type="datetime-local"
                name={name}
                value={formData[name] || ""}
                onChange={(e) => updateFormData(name, e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                {...props}
            />
            </div>
        );
    };

    Form.File = function FormFile({ name, ...props }){
        const { updateFormData } = useContext(FormContext);

        return (
            <input
                type="file"
                name={name}
                accept="image/*"
                onChange={(e) => updateFormData(name, e.target.files[0])}
                {...props}
            />
        );
    }


    Form.Button = function FormButton({ children, ...props }) {
    return (
        <Button type="submit" {...props}>
        {children}
        </Button>
    );
};


export default Form;