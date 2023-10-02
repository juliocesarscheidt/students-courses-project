export default interface Usecase<INPUT, OUTPUT> {

  Execute(input: INPUT): Promise<OUTPUT>;
}
