export default function ChoirDashboard() {
  const [members, setMembers] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, padding: 10 }}>Total Members: {members.length}</Text>
      <FlatList
        numColumns={2}
        data={members}
        renderItem={({ item }) => (
          <View style={{ width: '50%', padding: 10 }}>
            <Image source={{ uri: item.photoUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <Text>{item.name}</Text>
            <Text style={{ color: 'grey' }}>{item.role}</Text>          </View>
        )}
      />
    </View>
  );
}