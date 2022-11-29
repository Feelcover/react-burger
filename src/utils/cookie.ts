export function getCookie(name: string): undefined | string {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string | number | boolean,
  props: { [key: string]: any } & { expires?: string | number | Date } = {}
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 20000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name:string) {
  setCookie(name, '', { expires: -1 });
}

export const formatDate = (date:string) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Moscow",
  });

  let dateOfOrder = new Date(date);

  const today = new Date();

  function diffSubtract(dayOne:any, dayTwo:any):number {
    return Math.ceil((dayOne - dayTwo) / 86400000);
  }

  let dayQty = diffSubtract(today, dateOfOrder);

  const formatterForFay = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    year: "numeric",
    month: "long",
    timeZone: "Europe/Moscow",
  });

  const formatDay = (dateOfOrder: Date, dayQty: number): undefined | string => {
    if (formatterForFay.format(today) === formatterForFay.format(dateOfOrder)) {
      return "Cегодня";
    }
    if (dayQty === 1) {
      return "Вчера";
    }
    if (dayQty === 2 || dayQty === 3 || dayQty === 4) {
      return `${dayQty} дня назад`;
    }
    if (dayQty > 4) {
      return `${dateOfOrder.toLocaleDateString("ru-RU")}`;
    }
  };
  return `${formatDay(dateOfOrder, dayQty)}, ${formatter.format(
    dateOfOrder
  )} i-GMT+3`;
};
