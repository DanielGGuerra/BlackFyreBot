import { searh_data_player } from "../../service/op_gg"

export const searchPlayerStaticChamp = async(name: string) => {
    const results = await searh_data_player(name)

    if (results?.length == 0 || !results) return 'Nenhum dado encontrado'

    let formatedText = `### Taxa de vitoria ${name} - Rank ###\n`

    results?.forEach(({ name, winRate }, index ) => {
        formatedText += `${index+1}º ${name} - taxa de vitoria: ${winRate}\n`
    })

    return formatedText
}