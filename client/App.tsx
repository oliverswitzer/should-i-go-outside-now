import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import { gateway, PlaceType } from "./Gateway";


const App = () => {
  const [places, setPlaces] = useState<PlaceType[]>([]);

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
      renderItem={({ item, index }: { item: PlaceType, index: number}) => <Place item={item} key={index} />}
      renderSectionHeader={() => <Header/>}
      sections={[{ data: places }]}
    />
  </SafeAreaView>;
};

const Header = () => <Text style={{ fontSize: 20, padding: 12 }}>Top Places Near You</Text>;

const Place = ({ item }: { item: PlaceType }) => <View style={{ borderColor: 'gray', borderWidth: 1, padding: 12, margin: 12, marginBottom: 0 }}>
  <Text style={{fontWeight: 'bold', fontSize: 12}}>{item.name}</Text>
  <Text>Rating: {item.rating}</Text>
  <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
    {
      item.populartimes[1].data.map((popularity: number, index: number) => (
        <View key={index}>
          {popularity !== 0 && (
            <>
              <View style={{ height: popularity, marginRight: 5, backgroundColor: 'blue' }}/>
              <Text>{index}</Text>
            </>
          )}
        </View>
      ))
    }
  </View>
</View>;

export default App;
