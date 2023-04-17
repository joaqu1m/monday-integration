const campos = {
    "status": {
        opts: {
            "Visitante": 1,
            "Lead": 2,
            "Oportunidade": 3,
            "Cliente Adquirido": 4,
            "Cliente Perdido": 5
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
    "Data de nascimento": {
        colunaBanco: "dt_nascimento",
        formatar: "formatDate",
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
            "Outro": 7
        }
    },
    "Tem interesse pela nossa loja?": {
        colunaBanco: "opt_interesse_loja",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": 1,
            "Talvez": 2,
            "Não": 3
        }
    },
    "Você reside em:": {
        colunaBanco: "opt_reside",
        formatar: null,
        fkExterna: null,
        opts: {
            "Apartamento": 1,
            "Casa Térrea": 2,
            "Casa Sobrado": 3
        }
    },
    "Qual o tamanho da sua residência": {
        colunaBanco: "opt_tamanho",
        formatar: null,
        fkExterna: null,
        opts: {
            "10m² - 30m²": 1,
            "31m² - 50m²": 2,
            "51m² - 70m²": 3,
            "71m² - 90m²": 4,
            "91m² - 110m²": 5,
            "+110m²": 6
        }
    },
    "Você já contratou algum prestador de serviço na Manuall?": {
        colunaBanco: "bln_ja_contratou",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false
        }
    },
    "Tem interesse em contratar algum prestador de serviço?": {
        colunaBanco: "opt_contratar",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim, estou precisando urgentemente!": 1,
            "Talvez, estou vendo.": 2,
            "Não, não preciso de nenhum serviço.": 3
        }
    },
    "Qual desses serviços você está buscando?": {
        formatar: null,
        fkExterna: "inserirAreaContratante",
        opts: {
            "Jardineiro": 1,
            "Pintor": 2,
            "Eletricista": 3,
            "Encanador": 4,
            "Marceneiro": 5,
            "Montador": 6,
            "Gesseiro": 7
        }
    },
    "Você teria interesse em aprender algum dos serviços citados anteriormente?": {
        colunaBanco: "bln_aprender",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim, possuo interesse.": true,
            "Não, quero apenas contratar o prestador de serviço.": false
        }
    },
    "Você contratou algum prestador de serviço em nossa plataforma?": {
        colunaBanco: "bln_contratou",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false
        }
    },
    "Explique sua falta de interesse pela Manuall": {
        colunaBanco: "msg_desistencia",
        formatar: null,
        fkExterna: null,
        opts: null
    },
    "Tem interesse pela nossa plataforma?": {
        colunaBanco: "opt_interesse_plat",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": 1,
            "Talvez": 2,
            "Não": 3
        }
    },
    "Você é:": {
        formatar: null,
        fkExterna: "inserirAreaContratante",
        opts: {
            "Jardineiro": 1,
            "Pintor": 2,
            "Eletricista": 3,
            "Encanador": 4,
            "Marceneiro": 5,
            "Montador": 6,
            "Gesseiro": 7
        }
    },
    "Quanto tempo de experiência na área?":{
        colunaBanco: "opt_experiencia",
        formatar: null,
        fkExterna: null,
        opts: {
            "0 - 5 anos": 1,
            "6 - 10 anos": 2,
            "11 - 15 anos": 3,
            "16 - 20 anos": 4,
            "21 - 25 anos": 5,
            "+26 anos": 6
        }
    },
    "Qual a faixa do valor que você cobra pelo seu serviço? (Mínimo - Máximo)": {
        colunaBanco: "faixa",
        formatar: null,
        fkExterna: null,
        opts: null
    },
    "Você já divulga seu trabalho na Manuall?": {
        colunaBanco: "bln_divulga",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false
        }
    },
    "Você teria interesse em ensinar um pouco sobre a sua área ao outro?": {
        colunaBanco: "bln_interesse_ensinar",
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim, possuo interesse.": true,
            "Não, quero apenas prestar meu serviço.": false
        }
    },
    "Como você cobra pelo seu serviço?": {
        colunaBanco: "como_cobra",
        formatar: null,
        fkExterna: null,
        opts: null
    },
    "Você irá divulgar seu serviço em nossa plataforma?": {
        formatar: null,
        fkExterna: null,
        opts: {
            "Sim": true,
            "Não": false
        }
    }
}

module.exports = campos