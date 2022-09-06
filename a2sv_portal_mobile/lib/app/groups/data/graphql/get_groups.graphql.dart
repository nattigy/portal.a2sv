String Get_Groups = r"""
query Groups{
  groups{
    id
    name
    school
    topics{
      topic{
        name
      }
      }
    users{
      id
    }
  }
}
""";
