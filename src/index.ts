// TYPES
// =====


/** Word format. */
interface Word {
  /** Word? */
  word: string,
  /** Lex id? */
  lex_id: number,
}


/** Minified word format for storing as JSON on disk. */
interface MinifiedWord {
  /** Word? */
  w: string,
  /** Lex id? */
  l: number,
}


/** Pointer format. */
interface Pointer {
  /** Pointer symbol? */
  pointer_symbol: string,
  /** Synset offset? */
  synset_offset: number,
  /** Part of speech? */
  pos: string,
  /** Source? */
  source: number,
  /** Target? */
  target: number,
}


/** Minified pointer format for storing as JSON on disk. */
interface MinifiedPointer {
  /** Pointer symbol? */
  o: string,
  /** Synset offset? */
  y: number,
  /** Part of speech? */
  p: string,
  /** Source? */
  s: number,
  /** Target? */
  t: number,
}


/** Frame format. */
interface Frame {
  /** Frame number. */
  f_num: number,
  /** Word number. */
  w_num: number,
}


/** Minified frame format for storing as JSON on disk. */
interface MinifiedFrame {
  /** Frame number. */
  f: number,
  /** Word number. */
  w: number,
}


/** Synset format. */
interface Synset {
  /** Lex file number? */
  lex_filenum: number,
  /** Synset type? */
  ss_type: string,
  /** Word count? */
  w_cnt: number,
  /** Words? */
  words: Word[],
  /** Pointer count? */
  p_cnt: number,
  /** Pointers? */
  pointers: Pointer[],
  /** Frame count? */
  f_cnt: number,
  /** Frames? */
  frames: Frame[] | null,
  /** Gloss? */
  gloss: string | null,
}


/** Minified synset format for storing as JSON on disk. */
interface MinifiedSynset {
  /** Lex file number? */
  l: number,
  /** Synset type? */
  s: string,
  /** Words? */
  w: MinifiedWord[],
  /** Pointers? */
  p: MinifiedPointer[],
  /** Frames? */
  f?: MinifiedFrame[],
  /** Gloss? */
  g?: string,
}




// METHODS
// =======

// HELPERS
// -------

/**
 * Get padded string representation of number.
 * @param x a number
 * @param n number of digits [2]
 * @returns zero-padded string representation of number
 */
function pad(x: number, n:number=2): string {
  return x.toString().padStart(n, "0");
}


/**
 * Copy part of array to another array, like Array.slice().
 * @param x source array
 * @param i source begin index [0]
 * @param I source end index [|x|]
 * @param a target array [[]]
 * @param j target begin index [|a|]
 * @param J target end index [j+(I-i)]
 * @returns target array
 */
function copyValuesFrom$<T>(x: T[], i: number=0, I: number=x.length, a: T[]=[], j: number=a.length, J: number=j+(I-i)): T[] {
  if (J>a.length)   a.length = J;
  if (x===a) return a.copyWithin(j, i, I);
  for (var i=i; i<I; i++)
    a[j++] = x[i];
  return a;
}


/**
 * Move part of array to another array.
 * @param x source array
 * @param v clear value
 * @param i source begin index [0]
 * @param I source end index [|x|]
 * @param a target array [[]]
 * @param j target begin index [|a|]
 * @param J target end index [j+(I-i)]
 * @returns target array
 */
function moveValuesFrom$<T>(x: T[], v: T, i: number=0, I: number=x.length, a: T[]=[], j: number=a.length, J: number=j+(I-i)): T[] {
  copyValuesFrom$(x, i, I, a, j, J);
  x.fill(v, i, I);
  return a;
}


/**
 * Get index of closest value in sorted array.
 * @param x a sorted array
 * @param v search value
 * @param fn unused
 * @param ths unused
 * @param i search begin index [0]
 * @param I search end index [|x|]
 * @returns index of closest match
 */
function binarySearchClosest<T>(x: T[], v: T, fn: null, ths: null, i: number=0, I: number=x.length): number {
  while (i<I) {
    var m = (i + I) >>> 1;
    if      (x[m]<v) i = m + 1;
    else if (x[m]>v) I = m;
    else return m;
  }
  return i;
}


/**
 * Get index of value in sorted array.
 * @param x a sorted array
 * @param v search value
 * @param fn unused
 * @param ths unused
 * @param i search begin [0]
 * @param I search end [|x|]
 * @returns index of match
 */
function binarySearch<T>(x: T[], v: T, fn: null, ths: null, i: number=0, I: number=x.length): number {
  while (i<I) {
    var m = (i + I) >>> 1;
    if      (x[m]<v) i = m + 1;
    else if (x[m]>v) I = m;
    else return m;
  }
  return ~i;
}




// MINIFY/EXPAND
// -------------

/**
 * Minify word data of WordNet in expanded form.
 * @param x expanded word data
 * @returns minified word data
 */
function minifyWord(x: Word): MinifiedWord {
  return {
    w: x.word,
    l: x.lex_id
  };
}


/**
 * Expand word data of WordNet in minified form.
 * @param x minified word data
 * @returns expanded word data
 */
function expandWord(x: MinifiedWord): Word {
  return {
    word:   x.w,
    lex_id: x.l,
  };
}




/**
 * Minify pointer data of WordNet in expanded form.
 * @param x expanded pointer data
 * @returns minified pointer data
 */
function minifyPointer(x: Pointer): MinifiedPointer {
  return {
    o: x.pointer_symbol,
    y: x.synset_offset,
    p: x.pos,
    s: x.source,
    t: x.target
  };
}


/**
 * Expand pointer data of WordNet in minified form.
 * @param x minified pointer data
 * @returns expanded pointer data
 */
function expandPointer(x: MinifiedPointer): Pointer {
  return {
    pointer_symbol: x.o,
    synset_offset:  x.y,
    pos:    x.p,
    source: x.s,
    target: x.t,
  };
}




/**
 * Minify frame data of WordNet in expanded form.
 * @param x expanded frame data
 * @returns minified frame data
 */
function minifyFrame(x: Frame): MinifiedFrame {
  return {
    f: x.f_num,
    w: x.w_num
  };
}


/**
 * Expand frame data of WordNet in minified form.
 * @param x minified frame data
 * @returns expanded frame data
 */
function expandFrame(x: MinifiedFrame): Frame {
  return {
    f_num: x.f,
    w_num: x.w,
  };
}




/**
 * Minify synset data of WordNet in expanded form.
 * @param x expanded synset data
 * @returns minified synset data
 */
function minifySynset(x: Synset): MinifiedSynset {
  var words = [], pointers = [], frames = [];
  for (var i=0, I=x.w_cnt; i<I; ++i)
    words[i] = minifyWord(x.words[i]);
  for (var i=0, I=x.p_cnt; i<I; ++i)
    pointers[i] = minifyPointer(x.pointers[i]);
  for (var i=0, I=x.f_cnt||0; i<I; ++i)
    frames[i] = minifyFrame(x.frames[i]);
  var a: MinifiedSynset = {l: x.lex_filenum, s: x.ss_type, w: words, p: pointers};
  if (x.frames!=null) a.f = frames;
  if (x.gloss !=null) a.g = x.gloss;
  return a;
}


/**
 * Expand synset data of WordNet in minified form.
 * @param x minified synset data
 * @returns expanded synset data
 */
function expandSynset(x: MinifiedSynset): Synset {
  var words = [], pointers = [], frames = [];
  for (var i=0, I=x.w.length; i<I; ++i)
    words[i] = expandWord(x.w[i]);
  for (var i=0, I=x.p.length; i<I; ++i)
    pointers[i] = expandPointer(x.p[i]);
  for (var i=0, I=(x.f||[]).length; i<I; ++i)
    frames[i] = expandFrame(x.f[i]);
  var a: Synset = {
    lex_filenum: x.l,  ss_type: x.s,
    w_cnt: x.w.length, words,
    p_cnt: x.p.length, pointers,
    f_cnt: 0,          frames: null,
    gloss: null,
  };
  if (x.f) { a.f_cnt = x.f.length; a.frames = frames; }
  if (x.g) { a.gloss = x.g; }
  return a;
}




/**
 * Get lex sense of word sense for WordNet.
 * @param ss_type synset type
 * @param lex_filenum lex file number
 * @param lex_id lex id
 * @param head_word head word
 * @param head_id head id
 * @returns lex sense
 */
function lexSense(ss_type: string, lex_filenum: number, lex_id: number, head_word: string, head_id: number): string {
  var head = head_word? head_word + ":" + pad(head_id) : ":";
  return ss_type + ":" + pad(lex_filenum) + ":" + pad(lex_id) + ":" + head;
}


/**
 * Get sense key of word sense for WordNet.
 * @param lemma lemma
 * @param ss_type synset type
 * @param lex_filenum lex file number
 * @param lex_id lex id
 * @param head_word head word
 * @param head_id head id
 * @returns sense key
 */
function senseKey(lemma: string, ss_type: string, lex_filenum: number, lex_id: number, head_word: string, head_id: number): string {
  return lemma + "%" + lexSense(ss_type, lex_filenum, lex_id, head_word, head_id);
}




// LEX NUMBER
// ----------

function fromNumbers(lfn, pos) {
  if(lfn>=0) return lexNumberArray[pos<5? lfn:45];
  if(pos>=0) return pos<5? pos<<6:lexNumberArray[45];
  return 0;
}

function fromString(str) {
  var prt = str.split('.');
  var lfn = prt.length>1? lexFileNameArray.indexOf(prt[0]+'.'+prt[1]):-1;
  var pos = posNameArray.indexOf(prt[0])-1;
  pos = pos<0? posSymbolArray.indexOf(prt[0])-1:pos;
  return fromNumbers(lfn, pos);
}

function lexNumber(lfn, pos=0) {
  return typeof lfn!=='string'? fromNumbers(lfn, pos):fromString(lfn);
}


const lexNumberArray = require('wordnet-lexnumberarray');
const LN_LFN = new Uint8Array(256);
for(var i=0, I=lexNumberArray.length-1; i<I; i++)
  LN_LFN[lexNumberArray[i]] = i;

  function toLexFileNumber(lex_num) {
  return LN_LFN[lex_num];
}

function toPosNumber(lex_num) {
  return lex_num!==144? 1+(lex_num>>>6):5;
}


module.exports = toLexFileNumber;



// LEX TYPE
// --------

function fromNumbers(num, lid) {
  return num<<6|lid;
}

function fromString(str) {
  var prt = str.split('.');
  var lid = Number(prt[prt.length-1])||0;
  return fromNumbers(lexNumber(str), lid);
}

function lexType(num, lid=0) {
  return typeof num!=='string'? fromNumbers(num, lid):fromString(num);
}

function toLexId(lex_type) {
  return lex_type&0x3F;
}


function toLexNumber(lex_type) {
  return lex_type>>>6;
}




// BAG
// ---

/**
 * Get section id.
 * @param off section offset
 * @param len section length
 * @returns section id
 */
function bagSection(off: number, len: number): number {
  return off << 10 | len;
}


/**
 * Get offset from section id.
 * @param id section id
 * @returns section offset
 */
function bagSectionOffset(id: number): number {
  return id >>> 10;
}


/**
 * Get section length from id.
 * @param id section id
 * @returns section length
 */
function bagSectionLength(id: number): number {
  return id & 0x3FF;
}

/**
 * Get an entry.
 * @param k entry key
 * @param v entry value
 * @returns entry
 */
function bagEntry(k: number, v: number): number {
  return k << 24 | v;
}

/**
 * Get entry key.
 * @param e entry
 * @returns entry key
 */
function bagEntryKey(e: number): number {
  return e >>> 24;
}

/**
 * Get entry value.
 * @param e entry
 * @returns entry value
 */
function bagEntryValue(e: number): number {
  return e & 0xFFFFFF;
}


/**
 * Get section values within a given key range.
 * @param bag bag
 * @param id section id
 * @param k begin key
 * @param K end key
 * @param a section values (updated)
 * @returns section values
 */
function bagSectionGetRange(bag: number[], id: number, k: number=0, K: number=32, a: Set<number>=new Set()) {
  var s = bagSectionOffset(id), S = s + bagSectionLength(id);
  var i = binarySearchClosest(bag, bagEntry(k, 0), null, null, s, S);
  var I = binarySearchClosest(bag, bagEntry(K, 0), null, null, s, S);
  for (; i<I; ++i)
    a.add(bagEntryValue(bag[i]));
  return a;
}


/**
 * Get section values for a given key.
 * @param bag bag
 * @param id section id
 * @param k key
 * @param a section values (updated)
 * @returns section values
 */
function bagSectionGet(bag: number[], id: number, k: number, a: Set<number>=new Set()) {
  return bagSectionGetRange(bag, id, k, k+1, a);
}


/**
 * Add an entry to a particular section.
 * @param bag bag
 * @param id section id
 * @param k entry key
 * @param v entry value
 * @returns section id
 */
function bagSectionAddEntry(bag: number[], id: number, k: number, v: number): number {
  var s = bagSectionOffset(id), N = bagSectionLength(id), S = s+N;
  var e = bagEntry(k, v), i = binarySearch(bag, e, null, null, s, S);
  if (i>=0) return id;
  i = ~i - s;
  if (S<bag.length && !!bag[S]) moveValuesFrom$(bag, 0, s, S, bag, s=bag.length, bag.length+N+1);
  if (i<N) bag.copyWithin(s+i+1, s+i, S=s+N);
  bag[s+i] = e;
  return bagSection(s, N+1);
}


/**
 * Add a key with multiple values to a section.
 * @param bag bag
 * @param id section id
 * @param k entry key
 * @param vs entry values
 * @param i values begin index
 * @param I values end index
 * @returns section id
 */
function bagSectionAddKey(bag: number[], id: number, k: number, vs: number[], i: number=0, I: number=vs.length): number {
  for (; i<I; i++)
    id = bagSectionAddEntry(bag, id, k, vs[i]);
  return id;
}


/**
 * Add keys with associated values to a section.
 * @param bag bag
 * @param ks entry keys
 * @param vs entry values
 * @param k keys begin index
 * @param K keys end index
 * @returns section id
 */
function bagSectionAdd(bag: number[], ks: number[], vs: number[], k: number=0, K: number=ks.length): number {
  var id = bagSection(bag.length, 0);
  bag.length += K-k;
  for (var i=k; i<K; ++i)
    id = bagSectionAddEntry(bag, id, ks[i], vs[i]);
  return id;
}


/**
 * Delete an entry froma a section.
 * @param bag bag
 * @param id section id
 * @param k entry key
 * @param v entry value
 * @returns section id
 */
function bagSectionDeleteEntry(bag: number[], id: number, k: number, v: number): number {
  var s = bagSectionOffset(id), B = s + bagSectionLength(id);
  var e = bagEntry(k, v);
  var i = binarySearch(bag, e, null, null, s, B);
  if (i>=0) { bag.copyWithin(i, i+1, B); bag[--B] = 0; }
  return bagSection(s, B-s);
}


/**
 * Delete entries associated with a key.
 * @param bag bag
 * @param id seection id
 * @param k entry key
 * @returns section id
 */
function bagSectionDeleteKey(bag: number[], id: number, k: number): number {
  var b = bagSectionOffset(id), N = bagSectionLength(id), B = b+N;
  var i = binarySearchClosest(bag, bagEntry(k, 0),   null, null, b, B);
  var I = binarySearchClosest(bag, bagEntry(k+1, 0), null, null, b, B);
  if (i===I) return id;
  var l = I-i;
  bag.copyWithin(i, I, B);
  bag.fill(0, B-l, B);
  return bagSection(b, N-l);
}


/**
 * Delete all entries from a section.
 * @param bag bag
 * @param id section id
 * @returns 0
 */
function bagSectionDelete(bag: number[], id: number): number {
  var b = bagSectionOffset(id), B = b + bagSectionLength(id);
  bag.fill(0, b, B);
  return 0;
}




// GLOB
// ----

/** Data glob for WordNet book. */
class Glob {
  senses: any[]
  pointers: any[]
  frames: any[]
  constructor(senses=[], pointers=[], frames=[]) {
    this.senses   = senses;
    this.pointers = pointers;
    this.frames   = frames;
  }

  fromJson(v) {
    this.senses   = v.senses   || [];
    this.pointers = v.pointers || [];
    this.frames   = v.frames   || [];
    return this;
  }

  toJson() {
    return {
      senses:   this.senses,
      pointers: this.pointers,
      frames:   this.frames
    };
  }
}





class WordnetTable {
  size: number
  name: any[]
  type: any[]
  synset:   number[]
  pointers: number[]
  frames:   number[]
  constructor(name=[], type=[], synset=[], pointers=[], frames=[]) {
    this.size = name.length;
    this.name = name;
    this.type = type;
    this.synset   = synset;
    this.pointers = pointers;
    this.frames   = frames;
  }

  add(name, type, synset, pointers=0, frames=0) {
    var i = this.size++;
    this.name[i] = name;
    this.type[i] = type;
    this.synset[i]   = synset;
    this.pointers[i] = pointers;
    this.frames[i]   = frames;
    return i;
  }

  delete(i, n=1) {
    n = i+n > this.size? this.size - i : n;
    if (n<=0) return 0;
    for (var I=i+n; i<I; i++) {
      this.name[i] = null;
      this.type[i] = 0;
      this.synset[i]   = 0;
      this.pointers[i] = 0;
      this.frames[i]   = 0;
    }
    return n;
  }

  fromJson(v) {
    this.size = v.name.length;
    this.name = v.name || [];
    this.type = v.type || [];
    this.synset   = v.synset   || [];
    this.pointers = v.pointers || [];
    this.frames   = v.frames   || [];
    return this;
  }

  toJson() {
    return {
      name: this.name,
      type: this.type,
      synset:   this.synset,
      pointers: this.pointers,
      frames:   this.frames
    };
  }
}
