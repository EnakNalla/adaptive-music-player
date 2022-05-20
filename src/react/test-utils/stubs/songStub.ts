export const songStub = (secondary?: boolean): Song => {
  if (!secondary) {
    return {
      title: 'song stub',
      path: 'file://song stub.mp3'
    };
  }

  return {
    title: 'song stub secondary',
    path: 'file://song stub secondary.mp3'
  };
};
