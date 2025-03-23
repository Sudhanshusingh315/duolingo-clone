export default function Auth() {
    const handleAuth = async () => {
        window.open("http://localhost:5000/api/auth/user-auth", "_self");

        // await axios({
        //     url: `${constantsConfig.BASE_URL}/api/auth/user-auth`,
        // });
    };
    return (
        <div>
            <button
                onClick={handleAuth}
                className="button"
                variant="primary-outline"
            >
                auth
            </button>
        </div>
    );
}
