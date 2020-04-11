import React, { Component, useEffect, useState } from 'react';
import { Picker, SafeAreaView, SectionList, Text, View } from 'react-native';
import { gateway, PlaceType } from './Gateway';
import Swiper from 'react-native-swiper'

export const App = () => {
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

  return (
    <Swiper style={{}} showsButtons={true}>
      {days.map((day, index) => (
        <SubApp key={index} day={index} places={places} header={`Popular times for ${day}`}/>
      ))}
    </Swiper>
  )
};


const SubApp = ({ day, places, header }: { day: number, places: PlaceType[], header: string}) => {
  return <SafeAreaView>
    <SectionList
      renderItem={({ item, index }: { item: PlaceType, index: number }) => <Place day={day} item={item} key={index}/>}
      renderSectionHeader={() => <Header text={header}/>}
      sections={[{ data: places }]}
    />
  </SafeAreaView>;
};

const Header = ({ text }: {text: string}) => <Text style={{ fontSize: 20, padding: 12 }}>{text}</Text>;

const Place = ({ item, day }: { item: PlaceType, day: number }) => {
  const popularTimes = item.populartimes[day].data;

  const isLocalMinimum = (index: number): boolean => {
    const [before, current, after] = [popularTimes[index - 1], popularTimes[index], popularTimes[index + 1]];

    return (current <= before || !before) &&
      (current <= after || !after);
  };

  return <View style={{ borderColor: 'gray', borderWidth: 1, padding: 12, margin: 12, marginBottom: 0 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.name}</Text>
    <Text>Rating: {item.rating}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      {
        popularTimes.map((popularity: number, index: number) => (
          <View key={index} style={{ flex: 1 }}>
            <View style={{
              height: popularity,
              marginRight: 5,
              backgroundColor: isLocalMinimum(index) ? 'rgba(0,240,79,0.69)' : '#0096ff'
            }}/>
            <Text style={{ fontSize: 10, lineHeight: 13, height: 10 }}>{(index % 3) == 0 && (index + 1) % 12}</Text>
          </View>
        ))
      }
    </View>
  </View>;
};

export default App;
