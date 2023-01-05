const currentdate = new Date();
export const currentDate = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1)
    + "-" + currentdate.getDate()


const currentTime = currentdate.toLocaleTimeString();

export const currentDateTime = currentDate + "T" + currentTime;


