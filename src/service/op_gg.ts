import axios from "axios"
import { load } from "cheerio"

type Champion = {
    name: string;
    winRate: string;
    icon: string;
}

export const searh_data_player = async(name: String) => {
    try {
        const url = `https://br.op.gg/summoner/userName=${name.replace(' ', '+')}`

        const { data } = await axios.get(url)

        const $ = load(data)
        const champtionsRank = new Array<Champion>();

        $('div.ChampionName > a').each((id, elem) => {
            champtionsRank.push({
                name: $(elem).text().trim(),
                winRate: '',
                icon: ''
            })
        })

        $('div.Played > div.WinRatio').each((id, elem) => {
            if(champtionsRank.length) {
                champtionsRank[id]['winRate'] = $(elem).text().trim()
            }
        })

        $('img.ChampionImage').each((id, elem) => {
            if(champtionsRank.length) {
                champtionsRank[id]['icon'] = elem.attribs.src.slice(2)
            }
        })

        return champtionsRank
    } catch(err) {
        console.error(err)
    }
}