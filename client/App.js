import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import { gateway } from "./Gateway";

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mrPlum = await gateway.getPlace('ChIJ4RQESkRZwokRzOSbHg_AHd8');
      const associated = await gateway.getPlace('ChIJ-VYyzkZZwokRLaDlVih5Qzs');
      const met = await gateway.getPlace('ChIJGfDg705ZwokRvqa_3iQAPsQ');
      const chase = await gateway.getPlace('ChIJ_2Ukz0ZZwokRJZSgVQYl2eo');

      setPlaces([associated, met, mrPlum, chase])
    };
    fetchData()
  }, []);

  return <SafeAreaView>
    <SectionList
      renderItem={({ item }) => <Place item={item}/>}
      renderSectionHeader={() => <Header/>}
      sections={[{ data: places }]}
    />
  </SafeAreaView>;
};

const Header = () => <Text style={{ fontSize: 20, padding: 12 }}>Top Places Near You</Text>;

const Place = ({ item }) => <View style={{ borderColor: 'gray', borderWidth: 1, padding: 12, margin: 12, marginBottom: 0 }}>
  <Text style={{fontWeight: 'bold', fontSize: 12}}>{item.name}</Text>
  <Text>{item.id}</Text>
  <Text>{JSON.stringify(item.types)}</Text>
  <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
    {item.populartimes[0].data.map((popularity) => <View><View style={{height: popularity, marginRight: 4, backgroundColor: 'blue', fontSize: 2}}/><Text>{popularity}</Text></View>)}
  </View>
</View>;

export default App;
