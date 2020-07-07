interface FormValue {
    [k: string]: any
}

interface FormRule {
    key: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

type FormRules = Array<FormRule>

interface FormErrors {
    [k:string]: string[]
}
function isEmpty(value: any){
    return value === undefined || value === null || value === ''
}
const Validator = (formValue:FormValue, rules:FormRules):FormErrors => {
    let errors:any = {}
    const addError = (key:string, message: string) => {
        if(errors[key] === undefined){
            errors[key] = []
        }
        errors[key].push(message)
    }
    rules.map((rule)=> {
       const value = formValue[rule.key]
       if(rule.required&&isEmpty(value)){
           addError(rule.key, '必填')
       }
       if(rule.minLength&&!isEmpty(value)&&value!.length < rule.minLength){
        addError(rule.key, '输入太短')
       }
       if(rule.maxLength&&!isEmpty(value)&&value!.length > rule.maxLength){
        addError(rule.key, '输入太长')
       }
       if(rule.pattern){
           if(!(rule.pattern.test(value))){
                addError(rule.key, '格式错误')
           }
       }
    })
    return errors
}

export default Validator