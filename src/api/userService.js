export function registration(name,password,email) {
    fetch(process.env.BACKEND_URL+'/registration',
        {
            method: "POST"
        });
}