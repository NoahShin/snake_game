use snake_game::Person;
use snake_game::Animal;
use snake_game::log_info;
use snake_game::log_info_2;


fn main() {
  let mut person = Person::new();
  let animal = Animal(String::from("dog"));
  log_info(person);
  log_info_2(&animal);
}