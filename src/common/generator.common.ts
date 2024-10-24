import * as crypto from 'crypto';

export function generateCname(domain_name: string){
    let cname = `_${crypto.randomBytes(23).toString('hex')}.${domain_name}`
    let alias = `_${crypto.randomBytes(19).toString('hex')}.${process.env.APP_VERIFY_ADDRESS}`

    return {
        cname, alias
    }

}

export function generateTxt(){
    let app_name = process.env.APP_NAME || 'App'
    return `${app_name.toLowerCase()}-site-verification=${crypto.randomBytes(19).toString('hex')}`
}