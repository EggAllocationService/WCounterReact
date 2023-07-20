export interface WCounterUser {
    DisplayName: string,
    AvatarURL: string,
    WCount: number,
    LCount: number
}

export async function getUsers(): Promise<WCounterUser[]> {
    return await fetch("/api/users")
        .then(r => r.json())
        .then(r => r as WCounterUser[]);
}
