export class UrlBuilder {
  public url: string;

  constructor(
    private baseUrl: string,
    private action: string,
  ) {
    this.url = [baseUrl, action].join('/');
  }

  public toString(): string {
    return this.url;
  }
}
