struct Person {
  name: String,
  last_name: String,
  age: u32,
}

impl Person {
  fn some_function() {
    println!("somefuncstion");
  }

  fn display_age(&self) {
    println!("Current Age: {}", self.age);
  }
}
fn main() {

  Person::some_function();

  let person = Person {
    name: "Noah".to_string(),
    last_name: "Shin".to_string(),
    age: 30,
  };

  let person2 = Person {
    name: "Mow".to_string(),
    last_name: "Yang".to_string(),
    age: 42,
  };

  person.display_age();
  person2.display_age();

  println!("{}", person.name);
  println!("{}", person.last_name);
  println!("{}", person.age);

}

