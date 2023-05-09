function Input({type, ...rest}) {
    if(!type) throw new Error('Input component must have a type prop');
    const isText = type === "text";

    return (<>
        {isText && <input type="text" {...rest}/>}
        {!isText && <input type={type} {...rest}/>}
    </>)
}

export default Input;