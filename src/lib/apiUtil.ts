export interface WCounterUser {
    displayName: string,
    avatarURL: string,
    wCount: number,
    lCount: number,
    id: number
}

export async function getUsers(): Promise<WCounterUser[]> {
    return await fetch("https://dubs.cabotmc.dev/api/users", {
        mode: "cors"
    })
        .then(r => r.json())
        .then(r => r as WCounterUser[]);
}
