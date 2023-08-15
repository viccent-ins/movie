interface IQuestCorridor {
    id: number,
    amount: number | null,
    file: string,
    level: string,
    percentage: string,
    return: string,
}
interface IQuestCorridorResponse {
    QuestCorridor: IQuestCorridor[]
}
export {
    IQuestCorridor,
    IQuestCorridorResponse,
};
