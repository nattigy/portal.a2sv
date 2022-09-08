String Get_Groups = r"""
query Groups{
  groups{
    id
    name
    school
    country
    topics{
      topic{
        name
        id
        description
      }
    }
    users{
      id
    }
  }
}
""";
