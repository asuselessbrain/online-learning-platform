import { certificate } from "./certificate.model.js"

const createCertificate = async (payload) => {
    payload.certificateId = `EDU-${new Date().getFullYear()}-${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`
    return await certificate.create(payload)
}

export const certificateService = {
    createCertificate
}