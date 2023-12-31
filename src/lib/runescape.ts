import { grandexchange, hiscores } from "../configs/runescape"
import { Jagex, RuneScape } from "../types"
import { formatRuneMetricsProfileSkills } from "../utils/Jagex"


export class ClanMember {
  name: string
  rank: string
  experience: number
  kills: number

  constructor(member: Jagex.Clan.Member) {
    const [name, rank, experience, kills] = member.split(",")
    const regex = new RegExp(/\uFFFD/g)

    this.name = name.replace(regex, " ")
    this.rank = rank
    this.experience = parseInt(experience)
    this.kills = parseInt(kills)
  }
}

export class GrandExchangeCategory {
  id: number
  name: string

  constructor(category: Jagex.GrandExchange.Category | number) {
    if (typeof category === "string") {
      this.id = grandexchange.categories.indexOf(category)
      this.name = category
    } else {
      this.id = category
      this.name = grandexchange.categories[category]
    }
  }
}

export class Item {
  id: number
  name: string
  examine: string
  category: GrandExchangeCategory
  members: boolean
  icons: { default: string; large: string }
  trends: {
    current: { trend: string; price: string }
    today: { trend: string; price: string }
    day30?: { trend: string; price: string }
    day90?: { trend: string; price: string }
    day180?: { trend: string; price: string }
  }

  constructor(item: Jagex.GrandExchange.Item) {
    this.id = item.id
    this.name = item.name
    this.examine = item.description
    this.category = new GrandExchangeCategory(item.type)
    this.members = item.members === "true" ? true : false

    this.icons = {
      default: item.icon,
      large: item.icon_large,
    }

    this.trends = {
      current: item.current,
      today: item.today,
      day30: item.day30,
      day90: item.day90,
      day180: item.day180,
    }
  }
}

export class ItemGraph {
  id: number
  daily: { [key: string]: number }
  average: { [key: string]: number }

  constructor(id: number, graph: Jagex.GrandExchange.ItemGraph) {
    this.id = id
    this.daily = graph.daily
    this.average = graph.average
  }
}

export class Player {
  name: string
  activities: Jagex.Hiscores.PlayerActivites
  skills: Jagex.Hiscores.PlayerSkills

  constructor(name: string, player: Jagex.Hiscores.PlayerJSON) {
    this.name = name
    this.activities = player.activities
    this.skills = player.skills
  }
}

export class Quest {
  name: string
  status: RuneScape.RuneMetrics.QuestStatus
  difficulty: number
  members: boolean
  questPoints: number
  eligible: boolean

  constructor(quest: Jagex.RuneMetrics.Quest) {
    this.name = quest.title
    this.status = quest.status
    this.difficulty = quest.difficulty
    this.members = quest.members
    this.questPoints = quest.questPoints
    this.eligible = quest.userEligible
  }
}

export class RuneMetricsMonthlyExperience {
  skill: Skill
  totalExperience: number
  totalGain: number
  monthData: any[]

  constructor(monthlyExperienceGain: Jagex.RuneMetrics.MonthlyExperienceGain) {
    this.skill = new Skill(monthlyExperienceGain.skillId)
    this.totalExperience = monthlyExperienceGain.totalXp
    this.totalGain = monthlyExperienceGain.totalGain
    this.monthData = monthlyExperienceGain.monthData
  }
}

export class RuneMetricsProfile {
  name: string
  combatLevel: number
  activities: RuneScape.RuneMetrics.ProfileActivities[]
  overall: RuneScape.RuneMetrics.ProfileOverall
  skills: RuneScape.RuneMetrics.ProfileSkills
  quests: RuneScape.RuneMetrics.ProfileQuests
  experience_distribution: RuneScape.RuneMetrics.ProfileExperienceDistribution

  constructor(profile: Jagex.RuneMetrics.Profile) {
    this.name = profile.name
    this.combatLevel = profile.combatlevel
    this.experience_distribution = {
      magic: profile.magic,
      melee: profile.melee,
      ranged: profile.ranged,
    }
    this.overall = {
      rank: parseInt(profile.rank.replace(",", "")),
      level: profile.totalskill,
      experience: profile.totalxp,
    }
    this.skills = formatRuneMetricsProfileSkills(profile.skillvalues)
    this.quests = {
      complete: profile.questscomplete,
      started: profile.questsstarted,
      not_started: profile.questsnotstarted,
    }
    this.activities = profile.activities.map(({ text, details, date }) => {
      return {
        title: text,
        description: details,
        date,
      }
    })
  }
}

export class Skill {
  id: number
  name: string

  constructor(skill: RuneScape.Hiscores.Skill | number) {
    if (typeof skill === "string") {
      this.id = hiscores.skills.indexOf(skill)
      this.name = skill
    } else {
      this.id = skill
      this.name = hiscores.skills[skill]
    }
  }
}