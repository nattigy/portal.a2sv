String Get_Seasons = r"""
query Seasons{
  seasons{
    id
    name
    topics{
      id
      name
      description
      season {
        id
        name
        

        }
      }
  }
}
""";
