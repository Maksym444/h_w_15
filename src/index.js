class List {
  constructor (messages = [], name){
    this.messages = messages;
    this.name=name;
  }

  addToLocalStorage () {
    const localData = JSON.stringify(this.messages);
    localStorage.setItem (this.name, localData);
  }

  parseFromLocalStorage () {
    let parseData = localStorage.getItem (this.name);
    this.messages = parseData ? JSON.parse (parseData) : [];
 };

  addMessage (mess) {
    const dateNow = new Date;
    const data = {
      id : mess.id,
      name : mess.name,
      todayDate : `${dateNow.getFullYear()}.${dateNow.getMonth()}.${dateNow.getDay()} | ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getMilliseconds()}`,
      complicationStatus : false,
    }
    this.messages = [data, ...this.messages];
    this.addToLocalStorage()
  }

  deleteMessage(mess, confirm) {
    if (confirm) {
      this.messages = this.messages.filter(data => data.id !== mess)
      this.addToLocalStorage()
    }
  }
}

class ToDoList extends List {
  constructor (...args) {
    super (...args)
  }
  completeNote (id) {
    this.messages = this.messages.map(data => ({
        ...data,
        complicationStatus: data.id === id ? !data.complicationStatus : data.complicationStatus
    }))
    this.addToLocalStorage()};
  
    getStatusInfo() {
    return this.messages.reduce(
        (acc, data) => {
        data.complicationStatus && acc.complicationStatus++;
        return acc;
        },
        {total: this.messages.length, complicationStatus: 0}
    );
  }
}

class ContactList extends ToDoList {
  constructor (...args) {
    super (...args)
  }
  findMessage(name) {
    return this.messages.find(data => data.name === name)
  }
}

let myList = new ContactList ([], "Homework", []);
myList.addMessage ({id: "1",name: "Vinesty musor"});
myList.addMessage ({id: "2",name: "Ubrat na kuhne"});
myList.addMessage ({id: "3",name: "Prigotovit edu"});
myList.completeNote("2")






