import Numeral from 'numeral'

const dollarFilter = function(value){
    if(!value) return '$ 0'
    return Numeral(value).format('($) 0.00a')
}

const percentFilter = function(value){
    if(!value) return '$ 0'
    return `${Number(value).toFixed(2)}%`
}

export { dollarFilter , percentFilter}