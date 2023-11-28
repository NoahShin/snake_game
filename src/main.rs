#[derive(Debug)]
enum PersonId {
  Passport,
  IdentityCard,
}
struct Person {
  name: String,
  last_name: String,
  age: u32,
  id: PersonId,
}

impl Person {
  fn new11() -> Person {
    Person {
      name: "Default".to_string(),
      last_name: "Default".to_string(),
      age: 0,
      id: PersonId::IdentityCard
    }
  }
  fn change_age(&mut self, new_age: u32) {
    self.age = new_age;
  }
}
fn main() {
  let mut aa = Person::new11();
  aa.change_age(42);
  println!("{} {} {}", aa.age, aa.name, aa.last_name);

  let mut person = Person {
    name: "Noah".to_string(),
    last_name: "Shin".to_string(),
    age: 30,
    id: PersonId::Passport,
  };

  let mut person2 = Person {
    name: "Mow".to_string(),
    last_name: "Yang".to_string(),
    age: 42,
    id: PersonId::IdentityCard,
  };

  person.change_age(22);
  person2.change_age(21);

  
  println!("{}", person.age);
  println!("{}", person2.age);
  println!("{:?}", person2.id);

}

