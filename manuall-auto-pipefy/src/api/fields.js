const campos = {
    "status": {
        opts: {
            "Lead": 1,
            "Oportunidade": 2,
            "Cliente Adquirido": 3,
            "Cliente Perdido": 4,
            "": null
        }
    },
    // FORMULÁRIO INICIAL - CONTRATANTE E PRESTADOR
    "A partir de qual canal você chegou aqui?": {
        colunaBanco: "opt_canal",
        formatar: null,
        fkExterna: null,
        opts: {
            "Redes Sociais": 1,
            "Pesquisa": 2,
            "Indicação": 3,
            "Próprio site": 4,
            "": null
        }
    },
    "Nome Completo": {
        colunaBanco: "nome",
        formatar: null,
        fkExterna: null,
        opts: null
    },
    "Email": {
        colunaBanco: "email",
        formatar: null,
        fkExterna: null,
        opts: null
    },
    "Telefone": {
        colunaBanco: "fone",
        formatar: "formatCelular",
        fkExterna: null,
        opts: null
    },
    "Você mora em:": {
        colunaBanco: "opt_cidade",
        formatar: null,
        fkExterna: null,
        opts: {
            "São Paulo": 1,
            "São Bernardo do Campo": 2,
            "São Caetano do Sul": 3,
            "Santo André": 4,
            "Osasco": 5,
            "Bauru": 6,
            "Outro": 7,
            "": null
        }
    },
    "Já conhece a Manuall?": {
        colunaBanco: "bln_conhece_manuall",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false,
            "": null
        }
    },
    // LEAD CONTRATANTE
    "Qual(is) dessas áreas de serviços você está buscando?": {
        colunaBanco: "area_id",
        formatar: null,
        fkExterna: null,
        opts: {
            "Jardineiro": 1,
            "Pintor": 2,
            "Eletricista": 3,
            "Encanador": 4,
            "Marceneiro": 5,
            "Montador": 6,
            "Gesseiro": 7,
            "Nenhuma": null,
            "": null
        }
    },
    "Você teria interesse em aprender algum dos serviços citados anteriormente?": {
        colunaBanco: "bln_aprender",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim, possuo interesse.": true,
            "Não, quero apenas contratar o prestador de serviço.": false,
            "": null
        }
    },
    "Você tem interesse pela Manuall?": {
        colunaBanco: "bln_interesse_manuall",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false,
            "": null
        }
    },
    // LEAD - PRESTADOR
    "Selecione a sua área de serviço de interesse:": {
        colunaBanco: "area_id",
        formatar: null,
        fkExterna: null,
        opts: {
            "Jardineiro": 1,
            "Pintor": 2,
            "Eletricista": 3,
            "Encanador": 4,
            "Marceneiro": 5,
            "Montador": 6,
            "Gesseiro": 7,
            "Nenhuma": null,
            "": null
        }
    },
    "Você teria interesse em ensinar um pouco sobre a sua área ao outro?": {
        colunaBanco: "bln_interesse_ensinar",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim, possuo interesse.": true,
            "Não, quero apenas prestar meu serviço.": false,
            "": null
        }
    },
    "Você tem interesse pela Manuall?": {
        colunaBanco: "bln_interesse_manuall",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false,
            "": null
        }
    },
    "Você conhece alguma plataforma semelhante a Manuall?": {
        colunaBanco: "bln_conhece_semelhante",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false,
            "": null
        }
    },
    // OPORTUNIDADE CONTRATANTE
    "Utilizou o cupom e se tornou um cliente Contratante da Manuall?": {
        colunaBanco: "bln_cupom",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false,
            "": null
        }
    },
    // OPORTUNIDADE PRESTADOR
    "Utilizou o cupom e se tornou um cliente Prestador de Serviço da Manuall?": {
        colunaBanco: "bln_cupom",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false,
            "": null
        }
    },
    // CLIENTE PERDIDO - CONTRATANTE E PRESTADOR
    "Explique sua falta de interesse pela Manuall": {
        colunaBanco: "msg_desistencia",
        formatar: null,
        fkExterna: null,
        opts: null
    }
}

module.exports = campos