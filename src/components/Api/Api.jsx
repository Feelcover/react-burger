export const Api = {
    url: 'https://norma.nomoreparties.space/api/ingredients',
    headers: {
        'Content-Type': 'aplication.json'
    }
};


export const processResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Ошибка: Код ${res.status}`));
}