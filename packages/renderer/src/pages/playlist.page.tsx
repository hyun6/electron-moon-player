import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { PlayArrow, PlaylistAdd } from '@mui/icons-material';
import type { TrackId, TrackModel } from '../feature/track/track.model';
import { Box } from '@mui/material';
import { playbackService } from '../feature/playback/playback.service';
import { usePlaylistState } from '../feature/playlist/playlist.store';
import { playlistService } from '../feature/playlist/playlist.service';
import type { ReadonlyDeep } from 'type-fest';
import { newTrack } from '../feature/track/track.func';

function Track({
  track,
  onItemChecked,
}: {
  track: ReadonlyDeep<TrackModel>;
  onItemChecked: (id: TrackId, isChecked: boolean) => void;
}) {
  const [bChecked, setChecked] = useState(false);

  const onCheckHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setChecked(!bChecked);
    // logger('checked track id: ', track.id);
    onItemChecked(track.id, target.checked);
  };

  const handleTrackPlayClick = async () => {
    await playbackService.open(track.id);
    playbackService.play();
    // 사용자가 직접 재생목록에서 곡을 선택해 재생하는 경우 다시 셔플한다
    // - https://wiki.daumkakao.com/pages/viewpage.action?pageId=983723626
    // actions.reShuffle();
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={bChecked}
        onChange={onCheckHandler}
      />
      <b className="text-lg font-bold pl-2">{track.name}</b>
      <button
        type="button"
        className="playlistTrackPlay"
        style={{ height: 25, width: 25, margin: 5 }}
        onClick={handleTrackPlayClick}
      >
        <PlayArrow />
      </button>
    </li>
  );
}

export function PlaylistPage() {
  const playlistState = usePlaylistState();
  const [checkedItems, setCheckedItems] = useState(new Set<TrackId>());

  const handleItemChecked = (id: TrackId, isChecked: boolean) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  const handleAddButtonClicked = () => {
    // TODO: open file select dialog
    //  - validate audio file
    // playlistActions.add(track);
    playlistService.add(newTrack());
  };

  return (
    <Box>
      <div>PlaylistPage</div>
      <div>
        <button
          type="button"
          className="addTrackList"
          onClick={handleAddButtonClicked}
        >
          <PlaylistAdd />
        </button>
      </div>
      <ul>
        {playlistState.trackList.map((track: ReadonlyDeep<TrackModel>) => (
          <Track
            track={track}
            onItemChecked={handleItemChecked}
            key={track.id}
          />
        ))}
      </ul>
    </Box>
  );
}
