export const tokenService = {
    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('token', token);
            } catch (_) {
                // ignore storage errors
            }
        }
    },
    getToken: () => {
        if (typeof window !== 'undefined') {
            try {
                return localStorage.getItem('token');
            } catch (_) {
                return null;
            }
        }
        return null;
    },
    removeToken: () => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.removeItem('token');
            } catch (_) {
                // ignore storage errors
            }
        }
    }
};
