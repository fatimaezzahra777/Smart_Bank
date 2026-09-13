export async function hashPass(password){
    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hash = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(
        new Uint8Array(hash)
    );

    return hashArray
           .map(byte => byte.toString(16).padStart(2, "0"))
           .join("");
}