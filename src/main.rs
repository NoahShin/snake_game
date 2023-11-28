struct Person {
  name: String,
  last_name: String,
  age: u32,
}
fn main() {
  let person = Person {
    name: "Noah".to_string(),
    last_name: "Shin".to_string(),
    age: 30,
  };

  println!("{}", person.name);
  println!("{}", person.last_name);
  println!("{}", person.age);

}

