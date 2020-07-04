import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/newGameStyles';

const windowWidth = Dimensions.get('window').width

const NewGame = (props) => {
    let i
    let params = props.route.params
    const dimension = params.dimension
    const totalCells = params.totalCells
    const iconSize = params.iconSize
    const initialArray = []
    for (i = 0; i < totalCells; i++) {
        initialArray.push({
            id: i + 1,
            icon: '',
            isClicked: false
        })
    }

    const [gameArray, setGameArray] = useState(initialArray)
    const [blockClickCount, setBlockClickCount] = useState(0)
    const [player1, setPlayer1] = useState(Array(gameArray.length).fill(false))
    const [player2, setPlayer2] = useState(Array(gameArray.length).fill(false))
    const [popupMsg, setPopupMsg] = useState('')
    const [visible, setVisible] = useState(false)

    const arrayRowMatchCheck = (testArray) => {
        let matchFound = false
        testArray.map((data, index) => {
            if (testArray[index].every(v => v === true)) {
                matchFound = true
            }
        })
        return matchFound
    }

    const checkWinner = (playerArray, playerNo) => {
        let newArray = [...playerArray]
        let winnerArray = []
        let playWin = false
        if ((blockClickCount + 1) >= (dimension + (dimension - 1))) {
            while (newArray.length) winnerArray.push(newArray.splice(0, dimension));
            if (arrayRowMatchCheck(winnerArray)) {
                playWin = true
            }
            else if (arrayRowMatchCheck(winnerArray[0].map((col, i) => winnerArray.map(row => row[i])))) {
                playWin = true
            }
            else {
                let k = 0, m = 0, diagnonal1 = [], diagnonal2 = []
                while (k < dimension) {
                    diagnonal1.push(winnerArray[k][k])
                    for (m = 0; m < dimension; m++) {
                        if ((k + m) == (dimension - 1)) {
                            diagnonal2.push(winnerArray[k][m])
                        }
                    }
                    k++
                }
                if (arrayRowMatchCheck([diagnonal1])) {
                    playWin = true
                }
                else if (arrayRowMatchCheck([diagnonal2])) {
                    playWin = true
                }
            }
            if (playWin) {
                setMatchOver(true)
                setPopupMsg("Winner..!! Player " + playerNo)
                setVisible(true);
            }
            else {
                if (blockClickCount == (totalCells - 1)) {
                    setPopupMsg("Limit Exceeded")
                    setVisible(true);
                }
            }
        }
    }

    const isBlockSelected = async (index) => {
        let datas = [...gameArray]
        let count = blockClickCount
        let playerStatus = []
        let playerNo = 1
        if (!datas[index].isClicked) {
            count++
            datas[index].isClicked = true
            if (count % 2 == 0) {
                playerNo = 2
                datas[index].icon = 'close'
                playerStatus = [...player1]
                playerStatus[index] = true
                setPlayer1(playerStatus)
            }
            else {
                playerNo = 1
                datas[index].icon = 'circle-o'
                playerStatus = [...player2]
                playerStatus[index] = true
                setPlayer2(playerStatus)
            }
            setGameArray(datas);
            await setBlockClickCount(count);
            checkWinner(playerStatus, playerNo)
        }
    }

    const renderData = (item, index) => {
        return (
            <View
                onStartShouldSetResponder={() => isBlockSelected(index)}
                style={[styles.iconContainer,
                {
                    height: (windowWidth - (40 + (20 * dimension))) / dimension,
                    width: (windowWidth - (40 + (20 * dimension))) / dimension,
                }]}>
                {item.isClicked ? <Icon
                    name={item.icon}
                    color={"white"}
                    size={iconSize}
                /> : <View />}

            </View>
        )
    }

    const closePopup = () => {
        setVisible(false);
        props.navigation.goBack();
    }

    return (
        <View
            style={styles.mainContainer}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, { fontSize: 25 }]}>{popupMsg}</Text>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#36393f" }}
                            onPress={() => closePopup()}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: .5 }} />
            <View style={{ flex: 2, margin: 20 }}>
                <FlatList
                    data={gameArray}
                    renderItem={({ item, index }) => renderData(item, index)}
                    numColumns={dimension}
                    keyExtractor={item => item.id}
                />
            </View>

        </View>
    )
}

export default NewGame;


