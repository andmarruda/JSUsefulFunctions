/**
  validates a CPF that's brazilian document of people not company
  @version  3.0
  @author   Anderson Arruda < andmarruda@gmail.com >
  @param    string cpf
  @return   boolean
**/
const checkCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf.length != 11 || /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/.test(cpf))
        return false;
    
    let init_dv1 = 10,
        init_dv2 = 11,
        sum_dv1 = cpf.substr(0,9).split('').reduce((prev, val) => Number(prev) + (Number(val) * init_dv1--), 0),
        sum_dv2 = cpf.substr(0,10).split('').reduce((prev, val) => Number(prev) + (Number(val) * init_dv2--), 0);

    return (sum_dv1 % 11 < 2 ? 0 : 11 - sum_dv1 % 11) == cpf.substr(9,1) && (sum_dv2 % 11 < 2 ? 0 : 11 - sum_dv2 % 11) == cpf.substr(10,1);
};

/**
  validates a CNPJ that's brazilian document of companies
  @version    3.0
  @author     Anderson Arruda < andmarruda@gmail.com >
  @param      string cnpj
  @return     boolean
**/
const checkCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g,'');
    if(cnpj.length != 14 || /^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14})$/.test(cnpj))
        return false;
    
    let init_dv1 = 5,
        init_dv2 = 6,
        sum_dv1 = cnpj.substr(0,12).split('').reduce((prev, val) => {
            init_dv1 = init_dv1 == 1 ? 9 : init_dv1;
            return Number(prev) + (Number(val) * init_dv1--);
        }, 0),

        sum_dv2 = cnpj.substr(0,13).split('').reduce((prev, val) => {
            init_dv2 = init_dv2 == 1 ? 9 : init_dv2;
            return Number(prev) + (Number(val) * init_dv2--);
        }, 0);

    return (sum_dv1 % 11 < 2 ? 0 : 11 - sum_dv1 % 11) == cnpj.substr(12,1) && (sum_dv2 % 11 < 2 ? 0 : 11 - sum_dv2 % 11) == cnpj.substr(13,1);
};
