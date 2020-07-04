import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const OptionList = (props) => {
    let buttonArray = [
        {
            title: "3 X 3",
            dimension: 3,
            totalCells: 9,
            iconSize: 60,
        },
        {
            title: "4 X 4",
            dimension: 4,
            totalCells: 16,
            iconSize: 50
        },
        {
            title: "5 X 5",
            dimension: 5,
            totalCells: 25,
            iconSize: 40
        }
    ]
    let windowWidth = Dimensions.get('window').width
    return (
        <View style={{ flex: 1, backgroundColor: '#9099a4', alignItems: 'center', justifyContent: 'center' }}>
            {
                buttonArray.map(data =>
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#36393f',
                                height: 65,
                                width: windowWidth - 60,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25
                            }}
                            onPress={() => props.navigation.navigate('NewGame',
                                {
                                    totalCells: data.totalCells,
                                    dimension: data.dimension,
                                    iconSize: data.iconSize
                                })}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 30
                                }}
                            >{data.title}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>
    )
}

export default OptionList;