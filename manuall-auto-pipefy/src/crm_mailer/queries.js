const exec = require("../database/conn")

const inserir = async (id) => {
    return exec(`
        INSERT INTO manualldb.crm_log (usuario_id, inicio_contato, processo_finalizado)
        VALUES (${id}, NOW(), 0);
    `)
    .then((res) => {
        return res
    })
    .catch((err) => {
        console.log(err)
    })
}

const inserir2 = async (id) => {
    return exec(`
        INSERT INTO manualldb.crm_log_mensagem (mensagem, crm_log_id)
        VALUES (21539, ${id});
    `)
}

const inserir3 = async (id) => {
    return exec(`
        INSERT INTO manualldb.crm_log_mensagem (mensagem, crm_log_id)
        VALUES (10428, ${id});
    `)
}


const pegarPrestadoresMais90Dias = async () => {
    return exec(`
        SELECT u.id, u.email
        FROM manualldb.usuario u
        INNER JOIN (
            SELECT prestador_usuario_id, MAX(data_inicio) as ultima_solicitacao
            FROM manualldb.solicitacao
            GROUP BY prestador_usuario_id
        ) s ON u.id = s.prestador_usuario_id
        INNER JOIN (
            SELECT usuario_id, MAX(inicio_contato) as ultimo_contato
            FROM manualldb.crm_log
            GROUP BY usuario_id
        ) log ON u.id = log.usuario_id
        WHERE
            s.ultima_solicitacao < NOW() - INTERVAL 90 DAY
        AND 
            log.ultimo_contato < NOW() - INTERVAL 30 DAY;
    `)
    .then((res) => {
        return res
    })
    .catch((err) => {
        console.log(err)
    })
}

const pegarPrestadoresAtivos = async () => {
    return exec(`
        SELECT
        u.id,
        u.email
        FROM
        manualldb.usuario u
        LEFT JOIN manualldb.crm_log cl ON u.id = cl.usuario_id
        AND cl.inicio_contato > DATE_SUB(NOW(), INTERVAL 30 DAY)
        WHERE
        (
            SELECT COUNT(*)
            FROM manualldb.solicitacao s
            WHERE s.prestador_usuario_id = u.id
            AND s.data_inicio > DATE_SUB(NOW(), INTERVAL 30 DAY)
        ) >= 18
        AND cl.id IS NULL
        GROUP BY
        u.id,
        u.email;
    `)
    .then((res) => {
        return res
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = {
    inserir,
    inserir2,
    inserir3,
    pegarPrestadoresMais90Dias,
    pegarPrestadoresAtivos
}
