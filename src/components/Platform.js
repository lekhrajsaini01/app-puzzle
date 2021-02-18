import React, {Component} from 'react';
import Box from './Box';
import sprite from './images/enmy.jpg';

export default class Platform extends Component {
    // staes for movement
  state = {
      count:1,
        zero: '',
        possibleTopIdx: '',
        possiblRightIdx: '',
        possiblBottomIdx: '',
        possibleLeftIdx: ''
    };
    // for finding coordinates to click
    componentWillMount() {
        this.findClickables(this.props.platform, this.props.size);
    }
    componentWillReceiveProps(nextProps) {
        this.findClickables(nextProps.platform, nextProps.size);
    }
    shouldComponentUpdate(nextProps) {
        const curr = this
            .props
            .platform
            .join('');
        const next = nextProps
            .platform
            .join('');
        return curr !== next;
    }
    // code for click coordinates
    findClickables = (platform, size) => {
        const zeroIndex = platform.indexOf(0);
        const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
        const possibleTopIdx = zeroCoordinate.row > 0
            ? this.getIndexFromCoord(zeroCoordinate.row - 1, zeroCoordinate.column, size)
            : null;
        const possiblRightIdx = zeroCoordinate.column < size
            ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column + 1, size)
            : null;
        const possiblBottomIdx = zeroCoordinate.row < size
            ? this.getIndexFromCoord(zeroCoordinate.row + 1, zeroCoordinate.column, size)
            : null;
        const possibleLeftIdx = zeroCoordinate.column > 0
            ? this.getIndexFromCoord(zeroCoordinate.row, zeroCoordinate.column - 1, size)
            : null;

        this.setState({zero: zeroIndex, possibleTopIdx: possibleTopIdx, possiblRightIdx: possiblRightIdx, possiblBottomIdx: possiblBottomIdx, possibleLeftIdx: possibleLeftIdx});
    }
    getCoordFromIndex = (idx, size) => {
        return {
            row: Math.floor(idx / size) + 1,
            column: (idx % size) + 1
        };
    }
    getIndexFromCoord = (row, col, size) => {
        return (size * (row - 1)) + col - 1;
    }
    boxClickHandler = (index) => {
        if (index === this.state.possibleTopIdx || index === this.state.possiblRightIdx || index === this.state.possiblBottomIdx || index === this.state.possibleLeftIdx) 
            this.nextPlatform(index);
        }
        // movement from one box to another box
  nextPlatform = (index) => {
    this.setState({ count: this.state.count + 1 })

        const indexx = this.props.sprite.indexOf(index)
        if (indexx > -1) {
          this.props.sprite.splice(indexx, 1)
        }
        if (this.props.sprite.length === 0) {
          alert(`Game Over. Total moves to save bae: ${this.state.count}`)
          window.location.href = '/'
        }

        console.log(this.props.sprite)
        const platform = this
            .props
            .platform
            .slice();
        const temp = platform[index];
        platform[index] = platform[this.state.zero];
        platform[this.state.zero] = temp;
        this
            .props
            .updatePlatform(platform);
    }
    render() {
        // redendring plaform boxes
        const squares = this
            .props
            .platform
            .map((val, index) => {

                if ((index + 1) % this.props.size === 0) {
                    if (this.props.sprite.includes(val)) {
                        return (
                            <span key={'i' + index}>
                              <img
                        key={index}   
                              alt='sprite'
                      style={{width:60,height:60}}
                       src={sprite}
                        onClick={() => this.boxClickHandler(index)} />
                                <br/>
                            </span>
                        )
                    } else {
                        return (
                            <span key={'i' + index}>
                                {< Box key = {
                                    index
                                }
                                value = {
                                    val
                                }
                                sprite = {
                                    this.props.sprite
                                }
                                clickHandler = {
                                    () => this.boxClickHandler(index)
                                } />}
                                <br/>
                            </span>
                        );
                    }

                }
                // condition for uppper limit
                if (this.props.sprite.includes(val)) {
                    return (<img
                      key={index}
                      alt='sprite'
                      style={{width:60,height:60}}
                      src={sprite}
                      onClick={() => this.boxClickHandler(index)} />
                      )
                } else {
                    return <Box
                        key={index}
                        value={val}
                        clickHandler={() => this.boxClickHandler(index)}/>;
                }

            });
        return (
            // retruning platform background
            <div className='platform'>
                {squares}
            </div>
        );
    }
}
