interface IQuestCorridor {
    id: number,
    amount: number | null,
    file: string,
    level: string,
    percentage: string,
    return: string,
}
interface IQuestCorridorResponse {
    QuestCorridor: IQuestCorridor[],
}
interface IActiveMember {
    id: number,
    member_id: number| null,
    member_profit: string,
    member_image: string,
}
class ActiveMember implements IActiveMember {
    id: number;
    member_id: number| null;
    member_profit: string;
    member_image: string;
    get displayMemberId() {
        return String(this.member_id);
    };
    constructor(init: IActiveMember) {
        Object.assign(this, init);
    }
}
interface IActiveMemberResponse {
    ActiveMembers: IActiveMember[],
}
interface ICooperateFilm {
    id: number,
    cooperate_file: string,
}
interface ICooperateFilmResponse {
    CooperateFilms: ICooperateFilm[],
}
export {
    IQuestCorridor,
    IQuestCorridorResponse,
    IActiveMember,
    IActiveMemberResponse,
    ActiveMember,
    ICooperateFilm,
    ICooperateFilmResponse,
};
